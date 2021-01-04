'use strict'

const test = require('ava');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const agentFixture = require('./fixtures/agent');

let config = {
    logging: function(){}
}

let MetricStub = {
    belongsTo: sinon.spy()
}

let single = Object.assign({}, agentFixture.single)
let id = 1;
let AgentStub = null;
let db = null;
let sandbox = null;

test.beforeEach(async () => {
    sandbox = sinon.createSandbox();

    AgentStub = {
        hasMany: sandbox.spy()
    }

    // Model findById Stub
    AgentStub.findById = sandbox.stub();
    AgentStub.findById.withArgs(id)
        .returns(Promise.resolve(agentFixture.byId(id)));

    const setupDatabase = proxyquire('../', {
        './models/agent': () => AgentStub,
        './models/metric': () => MetricStub
    })
    db = await setupDatabase(config)
})

test.afterEach(() => {
    sandbox && sandbox.restore()
})

test('Agent', t => {
    t.truthy(db.Agent, 'Agent service should exist');
});

test.serial('Setup', t => {
    t.true(AgentStub.hasMany.called, 'AgentModel.hasMany was executed');
    t.true(AgentStub.hasMany.calledWith(MetricStub), 'Arguments should be the MetricModel');
    t.true(MetricStub.belongsTo.called, 'MetricModel.belongsTo was executed');
    t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should to be AgentModel');
})

test.serial('AgentfindById', async t => {
    let agent = await db.Agent.findById(id);

    t.true(AgentStub.findById.called, 'findById should be called on model')
    t.true(AgentStub.findById.calledOnce, 'findById should be called once')
    t.true(AgentStub.findById.calledWith(id), 'findById should be called with specified id')

    t.deepEqual(agent, agentFixture.byId(id), 'Should be the same')
})