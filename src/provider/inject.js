import ProviderWrapper from './ProviderWrapper';

const cap = {}

export function inject(ProviderClass) {
  let provider = new ProviderWrapper(ProviderClass);
  cap[provider.name] = provider;
  return provider;
}

export function all() {
  return cap;
}
export function getProvider(name) {
  return cap[name]
}
export function batchInject(providers) {
  return providers.map((provider) => {
    return inject(provider)
  })
}