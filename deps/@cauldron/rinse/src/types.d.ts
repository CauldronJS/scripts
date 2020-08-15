export interface SetStateCaller<T> {
  (newState: T): void;
}

export interface EffectCallback {
  (): EffectCleanup | undefined;
}

export interface EffectCleanup {
  (): void;
}

export type MarkedEffect = {
  effect: EffectCallback;
  component: string;
};

export enum FiberEventType {
  UNMOUNT,
  MOUNT,
  UPDATE_PROPS,
  UPDATE_STATE
}

export type RinseProps<T = unknown> = T & {
  children?: Rinsed | Rinsed[];
};

export interface Rinsable<TProps = RinseProps> {
  (props: RinseProps & TProps): Rinsed;
  defaultProps?: RinseProps<TProps>;
}

export type Rinsed = {
  component: Rinsable;
  props: RinseProps;
};
