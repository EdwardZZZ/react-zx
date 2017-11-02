export default const assign = (target, ...sources) => {
    for (let key in target) {   //Object.getOwnPropertyNames
        let _type = typeof target[key];
        if (target.hasOwnProperty(key) && _type !== 'function') {
            sources.forEach((source) => {
                if (key in source) {
                    target[key] = source[key]
                }
            });
        }
    }
}
