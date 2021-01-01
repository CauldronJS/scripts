
declare module 'java/lang' {
  export class Object {
    constructor();
    getClass(): Class;
    equals(obj: object): boolean;
    hashCode(): number;
    notify(): void;
    notifyAll(): void;
    toString(): string;
    wait(): void;
    wait(timeout: number, nanos?: number): void;
  }

  export class Class<T = any> extends Object {
    asSubclass<U>(clazz: Class<U>): Class<U>;
    cast(obj: object): T;
    desiredAssertionStatus(): boolean;
    static forName(module: string, name: string): Class;
    static forName(name: string): Class;
  }

  export class Enum<E extends Enum = any> extends Object implements Comparable<E> {
    protected constructor(name: string, ordinal: number);

    protected clone(): Object;
    protected finalize(): void;
    prototype: null;
    compareTo(o: E): number;
    equals(o: object): boolean;
    getDeclaringClass(): Class<E>;
    hashCode(): number;
    name(): string;
    ordinal(): number;
    toString(): string;
    static valueOf<T extends Enum<T>>(enumType: Class<T>, name: string): T;
  }

  export type JavaArray<T = unknown> = {

  }

  export interface Comparable<T> {
    compareTo(o: T): number;
  }

  export interface Cloneable {
    clone(): object;
  }

  export class Runnable {}
}

declare module 'java/nio' {
  export interface Buffer {}

  export class ByteBuffer extends Buffer {
    static allocate(capacity: number): ByteBuffer;
    static allocateDirect(capacity: number): ByteBuffer;
    array(): number[];
    arrayOffset(): number;
    asCharBuffer();
    asDoubleBuffer();
    asFloatBuffer();
    asIntBuffer();
    asLongBuffer();
    asReadOnlyBuffer();
    asShortBUffer();
    compareTo(other: ByteBuffer): number;
    duplicate(): ByteBuffer;
    get(): number;
    get(dst: number[]): ByteBuffer;
    get(dst: number[], offset: number, length: number): ByteBuffer;
    static wrap(array: number[]): ByteBuffer;
  }
}

declare module 'java/util' {
  export class UUID {
    toString(): string;
    clockSequence(): number;
    compareTo(val: UUID): number;
    equals(obj: object): boolean;
    static fromString(uuid: string): UUID;
    static randomUUID(): UUID;
  }

  export interface List<T> {
    add(index: number, element: T): void;
    add(element: T): boolean;
    addAll(index: number, elements: T[]): boolean;
    addAll(elements: T[]): boolean;
    clear(): void;
    contains(o: any): boolean;
    containsAll(c: any[]): boolean;
    get(index: number): T;
    indexOf(o: any): number;
    isEmpty(): boolean;
    lastIndexOf(o: any): number;
    remove(index: number): T;
    remove(o: any): boolean;
    removeAll(c: any[]): boolean;
    set(index: number, element: T): T;
    size(): number;
    toArray(): T[];
  }
}

declare module 'java/util/concurrent' {
  export interface Future<T> {
    cancel(mayInterrupt: boolean): boolean;
    get(): T;
    get(timeout: number, unit: TimeUnit): T;
    isCancelled(): boolean;
    isDone(): boolean;
  }

  export interface Callable<T> {
    call(): T;
  }
}

declare module 'java/util/function' {
  export interface Consumer<T> {
    (t: T): Consumer<T>;
    accept(t: T): void;
    andThen(after: Consumer<T>): Consumer<T>;
  }
}

declare module 'java/util/regex' {
  export class Pattern {}
}
