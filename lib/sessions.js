var NodeCache = require('node-cache');

var registerSessions = new NodeCache();
var feedbackSessions = new NodeCache({
    useClones: false
});
var publicBusSessions = new NodeCache();
var nusBusSessions = new NodeCache();
var faultSessions = new NodeCache({
    useClones: false
});
var diningSessions = new NodeCache({
    useClones: false
});

function RegisterSession(chatId) {
    this.chatId = chatId;
}

function createRegisterSession(chatId) {
    registerSessions.set(chatId, new RegisterSession(chatId), 30);
    return registerSessions.get(chatId);
}

function getRegisterSession(chatId) {
    return registerSessions.get(chatId);
}

function deleteRegisterSession(chatId) {
    return registerSessions.del(chatId.toString());
}

function FeedbackSession(chatId) {
    this.chatId = chatId;
    this.feedbackMsg = '';
    feedbackSessions[chatId] = this;
}

function createFeedbackSession(chatId) {
    feedbackSessions.set(chatId, new FeedbackSession(chatId), 120);
    return feedbackSessions.get(chatId);
}

function getFeedbackSession(chatId) {
    return feedbackSessions.get(chatId);
}

function deleteFeedbackSession(chatId) {
    return feedbackSessions.del(chatId.toString());
}

function PublicBusSession(chatId) {
    this.chatId = chatId;
}

function createPublicBusSession(chatId) {
    publicBusSessions.set(chatId, new PublicBusSession(chatId), 30);
    return publicBusSessions.get(chatId);
}

function getPublicBusSession(chatId) {
    return publicBusSessions.get(chatId);
}

function deletePublicBusSession(chatId) {
    return publicBusSessions.del(chatId.toString());
}

function NusBusSession(chatId) {
    this.chatId = chatId;
}

function createNusBusSession(chatId) {
    nusBusSessions.set(chatId, new NusBusSession(chatId), 30);
    return nusBusSessions.get(chatId);
}

function getNusBusSession(chatId) {
    return nusBusSessions.get(chatId);
}

function deleteNusBusSession(chatId) {
    return nusBusSessions.del(chatId.toString());
}

function FaultSession(chatId) {
    this.chatId = chatId;
    this.key = 'category';
    this.next = null;
    this.back = null;
    this.faultFeedback = {
        category: 'New',
        urgency: 'Urgent',
        location: '',
        name: '',
        room: '',
        matric: '',
        email: '',
        phone: '',
        permission: '',
        description: '',
    };
}

function createFaultSession(chatId) {
    faultSessions.set(chatId, new FaultSession(chatId), 120);
    return faultSessions.get(chatId);
}

function getFaultSession(chatId) {
    return faultSessions.get(chatId);
}

function deleteFaultSession(chatId) {
    return faultSessions.del(chatId.toString());
}

function DiningSession(chatId) {
    this.chatId = chatId;
    this.diningFeedback = new DiningFeedback();
}

function DiningFeedback() {
    this.when = '';
    this.where = '';
    this.how = -1;
    this.feedbackMsg = '';
}

function createDiningSession(chatId) {
    diningSessions.set(chatId, new DiningSession(chatId), 520);
    return diningSessions.get(chatId);
}

function getDiningSession(chatId) {
    return diningSessions.get(chatId);
}

function deleteDiningSession(chatId) {
    return diningSessions.del(chatId.toString());
}

function cancel(chatId, callback) {
    deleteFeedbackSession(chatId);
    deleteRegisterSession(chatId);
    deletePublicBusSession(chatId);
    deleteNusBusSession(chatId);
    deleteFaultSession(chatId);
    deleteDiningSession(chatId);
    callback('Your command has been *canceled*.');
}

module.exports = {
    createRegisterSession, getRegisterSession, deleteRegisterSession,
    createFeedbackSession, getFeedbackSession, deleteFeedbackSession,
    createPublicBusSession, getPublicBusSession, deletePublicBusSession,
    createNusBusSession, getNusBusSession, deleteNusBusSession,
    createFaultSession, getFaultSession, deleteFaultSession,
    createDiningSession, getDiningSession, deleteDiningSession,
    cancel
};
