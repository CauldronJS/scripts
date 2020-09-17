// the reconciler is in charge of the scheduling for Rinse

let currentComponent;
export const getCurrentComponent = () => currentComponent;
export const setCurrentComponent = component => (currentComponent = component);
