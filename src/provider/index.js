'use strict'
import Provider from './Provider';
import ProviderContainer from './ProviderContainer';
import RemoteProvider from './RemoteProvider';
import SessionProvider from './SessionProvider';
import StorageProvider from './StorageProvider';
import inject from './inject';

const use = ProviderCreator.use;

use('storage',StorageProvider);
use('remote',RemoteProvider);
use('session',SessionProvider);


export  {
    Provider,
    inject,
    use,
    ProviderContainer
};