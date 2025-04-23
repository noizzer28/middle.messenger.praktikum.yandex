export async function resolve(specifier, context, next) {
  if (specifier.endsWith('.scss')) {
    return {
      format: 'module',
      shortCircuit: true,
      url: new URL(specifier, import.meta.url).href
    };
  }

  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.endsWith('.scss')) {
    return {
      format: 'module',
      shortCircuit: true,
      source: 'export default {};'
    };
  }

  return next(url, context);
}
