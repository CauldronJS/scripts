export interface SetStateCaller<T> {
  (newState: T): void;
}

export interface EffectCallback {
  (): EffectCleanup | undefined;
}

export interface EffectCleanup {
  (): void;
}

export enum FiberEventType {
  UNMOUNT,
  MOUNT,
  UPDATE_PROPS,
  UPDATE_STATE,
  UPDATE_CONTEXT
}

export type RinseProps<T = unknown> = T & {
  children?: Rinsed | Rinsed[];
};

export interface Rinsable<TProps = RinseProps> {
  (props: RinseProps & TProps): Rinsed | Rinsed[];
  defaultProps?: RinseProps<TProps>;
}

export type Rinsed = {
  component: Rinsable;
  props: RinseProps;
};
