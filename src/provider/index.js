'use strict'
import Provider from './Provider';
import {getProvider} from './ProviderContainer';
import SessionProvider from './SessionProvider';
import inject from './inject';

use('session',SessionProvider);



export  {
    Provider,
    inject,
    getProvider
};