import options from './store'


export default (...args: any): void => {

  if (!options.debug) {
    return;
  }
  console.info(...args)


}
