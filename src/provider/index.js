'use strict'
import Provider from './Provider';
import {getState,setState} from './ProviderContainer';
import SessionProvider from './SessionProvider';
import {use} from './ProviderCreator';
import inject from './inject';

use('session',SessionProvider);



export  {
    Provider,
    inject,
    use,
    getState,
    setState
};