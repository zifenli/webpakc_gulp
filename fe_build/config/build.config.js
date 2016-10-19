/**
 * Created by lizifen on 16/8/28.
 * 每一个项目都有自己的一份
 */
var dirVars = require('../config/dir.config')
module.exports={
    weidong:{
        build_path:`${dirVars.rootDir}/weidong/build-scripts/build.js`
    },
    test:{
        build_path:`${dirVars.rootDir}/test/build-scripts/build.js`
    }
}