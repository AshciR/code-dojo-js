const events = [
    { delta: 1000, payload: { type: 'message', user: { id: 1, user_name: 'taco', display_name: 'Taco Spolsky' }, message: { id: 1, text: "Hello!" } }},
    { delta: 2000, payload: { type: 'message', user: { id: 2, user_name: 'chorizo', display_name: 'Chorizo' }, message: { id: 2, text: "Hi Taco!" } }},
    { delta: 2100, payload: { type: 'connect', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' } }},
    { delta: 3000, payload: { type: 'message', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' }, message: { id: 3, text: "Hi Taco!" } }},
    { delta: 4000, payload: { type: 'message', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' }, message: { id: 4, text: "What's going on in here?" } }},
    { delta: 5000, payload: { type: 'message', user: { id: 2, user_name: 'chorizo', display_name: 'Chorizo' }, message: { id: 5, text: "We're testing this chat replay app" } }},
    { delta: 6000, payload: { type: 'message', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' }, message: { id: 6, text: "Seems like it's working fine … in the *simple* case :)" } }},
    { delta: 6500, payload: { type: 'message', user: { id: 2, user_name: 'chorizo', display_name: 'Chorizo' }, message: { id: 7, text: "Cool!" } }},
    { delta: 6600, payload: { type: 'update', user: { id: 2, username: 'chorizothecat', display_name: 'Chorizo the Cat' }}},
    { delta: 7000, payload: { type: 'update', message: { id: 6, text: "Seems like it's working find … for *edits* also" }}},
    { delta: 8000, payload: { type: 'message', user: { id: 2, username: 'chorizothecat', display_name: 'Chorizo the Cat' }, message: { id: 8, text: "Just following @pete's lead…" }}},
    { delta: 8250, payload: { type: 'message', user: { id: 1, user_name: 'taco', display_name: 'Taco Spolsky' }, message: { id: 9, text: "We _know_ you're a cat @chorizothecat :facepalm:" }}},
    { delta: 10000, payload: { type: 'update', user: { id: 2, username: 'chorizo', display_name: 'Chorizo' }}},
    { delta: 11000, payload: { type: 'message', user: { id: 2, user_name: 'chorizo', display_name: 'Chorizo' }, message: { id: 10, text: "Oh fine … I mostly just wanted to see what happened when I changed my profile.  Sorry @taco :scream_cat:" } }},
    { delta: 12000, payload: { type: 'delete', message: { id: 9 }}},
    { delta: 14000, payload: { type: 'delete', message: { id: 10 }}},
    { delta: 15000, payload: { type: 'message', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' }, message: { id: 11, text: "Well, _that_ was fun.  Changing the subject … have you seen https://en.wikipedia.org/wiki/Market_share_of_personal_computer_vendors?" } }},
    { delta: 20000, payload: { type: 'message', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' }, message: { id: 12, text: "_I_ thought it was pretty interesting.\n\nReally makes you *think*." } }},
    { delta: 30000, payload: { type: 'message', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' }, message: { id: 13, text: "Anyone…?  @taco?  @chorizo?" } }},
    { delta: 31000, payload: { type: 'disconnect', user: { id: 2, user_name: 'chorizo', display_name: 'Chorizo' } }},
    { delta: 31002, payload: { type: 'disconnect', user: { id: 1, user_name: 'taco', display_name: 'Taco Spolsky' } }},
    { delta: 32000, payload: { type: 'message', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' }, message: { id: 14, text: "Aww :sob:" } }},
    { delta: 33100, payload: { type: 'connect', user: { id: 1, user_name: 'taco', display_name: 'Taco Spolsky' } }},
    { delta: 33150, payload: { type: 'disconnect', user: { id: 1, user_name: 'taco', display_name: 'Taco Spolsky' } }},
    { delta: 34000, payload: { type: 'connect', user: { id: 1, user_name: 'taco', display_name: 'Taco Spolsky' } }},
    { delta: 36000, payload: { type: 'message', user: { id: 1, user_name: 'taco', display_name: 'Taco Spolsky' }, message: { id: 15, text: "Whoops, I'm back.  Flaky wireless connection :ghost:…"} }},
    { delta: 36100, payload: { type: 'disconnect', user: { id: 1, user_name: 'taco', display_name: 'Taco Spolsky' } }},
    { delta: 66000, payload: { type: 'disconnect', user: { id: 3, user_name: 'pete', display_name: 'Pete the Computer' } }}
];

/**
 * Converts from a chat log event (the provided schema)
 * into a chat stream event (my representation of the data).
 *
 * Here's my train of thought, I want to display the final
 * state of the messages and notifications as a chat window,
 * similar to iMessage, WhatsApp, or Telegram.
 *
 * To accomplish this, I am converting the chat log events
 * into an object convenient for the UI components.
 *
 * From the perspective of UI component there are 2 types of events:
 * 1. A message event, e.g. Taco: "Hello!"
 * 2. A notification event, change of the chat room state. E.g. "Pete connected to the chat"
 *
 * @param chatLogEvent the original chat log object
 * @param eventsGroupedByMessageId
 * @param eventsGroupedByUserId
 * @return {*} chatroom object for UI component
 */
const convertChatLogEventToChatRoomEvent = (chatLogEvent, eventsGroupedByMessageId, eventsGroupedByUserId) => {

    // We have 2 types of events: message events and notification events.
    // If it's not a message event, I'm treating it as a notification event.
    const isMessageEvent = chatLogEvent.payload.type === 'message';
    return isMessageEvent ? convertChatLogEventToMessageEvent(chatLogEvent, eventsGroupedByMessageId) :
        convertChatLogEventToNotificationEvent(chatLogEvent, eventsGroupedByUserId);

};

const convertChatLogEventToMessageEvent = (chatLogEvent, eventsGroupedByMessageId) => {

    return {
        type: 'message',
        payload: {
            delta: chatLogEvent.delta,
            sender: chatLogEvent.payload.user.display_name,
            message: chatLogEvent.payload.message.text
        }
    };

};

const convertChatLogEventToNotificationEvent = (chatLogEvent) => {

    return {
        type: 'notification',
        payload: {
            delta: chatLogEvent.delta,
            sender: chatLogEvent.payload.user.display_name,
            message: chatLogEvent.payload.message.text
        }
    };

};

/**
 * Filters out the chat log events that have
 * message data in the payload.
 * @param events the chat log events
 * @return {*[]}
 */
const filterMessageEvents = (events) => {
    return events.filter(event => doesEventHaveMessageDataInPayload(event));
};

/**
 * Determines if a chat log even has message data in it
 * @param event chat log event
 * @return {boolean} true if event the payload has message data in the payload
 */
const doesEventHaveMessageDataInPayload = (event) => {
    return Object.keys(event.payload).includes('message');
};

/**
 * Filters out the chat log events that have
 * user data in the payload.
 * @param events the chat log events
 * @return {*[]}
 */
const filterEventsWithUsers = (events) => {
    return events.filter(event => doesEventHaveUserData(event));
};

/**
 * Determines if a chat log even has user data in it
 * @param event chat log event
 * @return {boolean} true if event the payload has user data in the payload
 */
const doesEventHaveUserData = (event) => {
    return Object.keys(event.payload).includes('user');
};

/**
 * Creating a Map/Dictionary where the key
 * is the user id and the value is the events
 * associated with the user.
 * @param eventsWithUsers events that have user data in the payload
 * @return {*[]}
 */
const groupEventsByUserId = (eventsWithUsers) => {

    // I'm using reduce instead of a traditional for loop
    // because I advocate for functional programming
    // and non-mutational code.
    return eventsWithUsers.reduce((acc, event) => {
        acc[event.payload.user.id] = acc[event.payload.user.id] ? [...acc[event.payload.user.id], event] : [event]
        return acc
    }, {});

};

/**
 * Creating a Map/Dictionary where the key
 * is the message id and the value is the events
 * associated with the message.
 * @param messageEvents events that have message data in the payload
 * @return {*[]}
 */
const groupEventsByMessageId = (messageEvents) => {

    // I'm using reduce instead of a traditional for loop
    // because I advocate for functional programming
    // and non-mutational code.
    return messageEvents.reduce((acc, event) => {
        acc[event.payload.message.id] = acc[event.payload.message.id] ? [...acc[event.payload.message.id], event] : [event]
        return acc
    }, {});

};

console.log(groupEventsByUserId(filterEventsWithUsers(events)));
console.log(groupEventsByMessageId(filterMessageEvents(events)));