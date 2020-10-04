declare module '@cauldron/config' {
  interface SetConfigHandler<T> {
    (newConfig: T);
  }

  /**
   * Enables a human-friendly configuration file in the config/ directory.
   *
   * @param name The name of the config to use
   * @param defaultConfig The configuration to be used if one doesn't exist
   */
  export default function useConfig<T = any>(
    name: string,
    defaultConfig: T
  ): [T, SetConfigHandler<T>];
}
