import { ApolloPersistOptions } from './types';
import CachePersistor from './CachePersistor';
import Persistor, { PersistorConfig } from './Persistor';
import Storage from './Storage';
export declare const persistCacheSync: <T>(options: ApolloPersistOptions<T>) => void;
export declare class SynchronousCachePersistor<T> extends CachePersistor<T> {
    persistor: SynchronousPersistor<T>;
    constructor(options: ApolloPersistOptions<T>);
    restoreSync(): void;
}
export declare class SynchronousPersistor<T> extends Persistor<T> {
    storage: SynchronousStorage<T>;
    constructor({ log, cache, storage }: PersistorConfig<T>, options: ApolloPersistOptions<T>);
    restoreSync(): void;
}
export declare class SynchronousStorage<T> extends Storage<T> {
    constructor(options: ApolloPersistOptions<T>);
    readSync(): any;
}
