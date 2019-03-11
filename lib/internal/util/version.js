exports.getBukkitVersion = function() {
    var ver = Bukkit.getServer().getClass().getPackage().getName().split('.')[3].substr(1).split('_');
    return '' + ver[0] + '.' + ver[1] + '.' + (ver[2][0] == 'R' ? '9' : ver[2]);
}

exports.getJvmVersion = function() {
    var ver = java.lang.System.getProperty('java.version');
    if (/^[0-9]+\.[0-9]+/g.test(ver)) {
        // we're working with developer version
        return ver.split('.')[1];
    } else {
        return ver.split('.')[0];
    }
}

exports.gt = function(verA, verB) {
    var va = verA.split('.');
    var vb = verB.split('.');

    for (var i = 0; i < 3; i++) {
        var vaNum = parseInt(va[i] || '0');
        var vbNum = parseInt(vb[i] || '0');
        if (vaNum > vbNum) return true;
        if (vaNum < vbNum) return false;
    }

    return false;
}

exports.gte = function(verA, verB) {
    var va = verA.split('.');
    var vb = verB.split('.');

    for (var i = 0; i < 3; i++) {
        var vaNum = parseInt(va[i] || '0');
        var vbNum = parseInt(vb[i] || '0');
        if (vaNum > vbNum) return true;
        if (vaNum < vbNum) return false;
    }

    return true;
}

exports.lt = function(verA, verB) {
    var va = verA.split('.');
    var vb = verB.split('.');

    for (var i = 0; i < 3; i++) {
        var vaNum = parseInt(va[i] || '0');
        var vbNum = parseInt(vb[i] || '0');
        if (vaNum > vbNum) return false;
        if (vaNum < vbNum) return true;
    }

    return false;
}

exports.lte = function(verA, verB) {
    var va = verA.split('.');
    var vb = verB.split('.');

    for (var i = 0; i < 3; i++) {
        var vaNum = parseInt(va[i] || '0');
        var vbNum = parseInt(vb[i] || '0');
        if (vaNum > vbNum) return false;
        if (vaNum < vbNum) return true;
    }

    return true;
}