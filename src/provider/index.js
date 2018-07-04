'use strict'
import Provider from './Provider';
import ProviderContainer from './ProviderContainer';
import SessionProvider from './SessionProvider';
import ProviderCreator from './ProviderCreator';
import inject from './inject';

const use = ProviderCreator.use;

use('session',SessionProvider);



export  {
    Provider,
    inject,
    use,
    ProviderContainer,
};