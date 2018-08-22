'use strict'
import {LazyRegister} from '../register';
import ProviderFactory from './ProviderFactory';

const ProviderRegister = new LazyRegister(ProviderFactory);

export default ProviderRegister;