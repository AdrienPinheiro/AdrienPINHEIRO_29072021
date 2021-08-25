const EventBus = {

    emit(name, detail) {
        document.dispatchEvent(new CustomEvent(name, { detail }));
    },

    off(name) {
        document.removeEventListener(name, () => {});
    },

    on(name, callback) {
        document.addEventListener(name, event => callback(event.detail));
        this.off(name);
    }
};

export default EventBus;