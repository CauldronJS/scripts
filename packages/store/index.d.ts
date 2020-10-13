declare module '@cauldronjs/store' {
  interface SetStoreHandler {
    (newProps: object);
  }

  /**
   * Creates a stored file that can be used to persist data
   * for the given app
   *
   * @param name Name of the store
   * @param defaultStore The default value of the store
   */
  export default function useStore(
    name: string,
    defaultStore: any
  ): [any, SetStoreHandler];
}
