var core = require("@actions/core");
var github = require("@actions/github");
var { readFileSync } = require('fs');

var content = readFileSync('./public/build/branches.txt', {encoding: "utf8"});
var spcontent = content.split("\n")
spcontent = spcontent.map((sp) =>{
	return sp.trim()
})

var separator = "remotes/origin/"
var versionSeparator = "sandbox/release-"
var prefix = `${separator}${versionSeparator}`
spcontent = spcontent.filter((sp) =>{
	if(sp.indexOf(prefix) == 0){
		return true;
	}
	return false
})
spcontent = spcontent.map((sp) =>{
	return sp.substring(separator.length)
})
spcontent = spcontent.map((sp) =>{
	return sp.substring(versionSeparator.length)
})
spcontent = spcontent.map((sp) =>{
	return sp.split(".")
})

var maxMajorVersion = 0;
var maxMinorVersion = 0;
var maxPatchVersion = 0;
spcontent.map((sp, index) =>{
	if(maxMajorVersion < sp[0]){
		maxMajorVersion = sp[0]
	}
})
spcontent = spcontent.filter((sp, index) =>{
	if(maxMajorVersion == sp[0]){
		return true
	}
	return false
})
spcontent.map((sp, index) =>{
	if(maxMinorVersion < sp[1]){
		maxMinorVersion = sp[1]
	}
})
spcontent = spcontent.filter((sp, index) =>{
	if(maxMinorVersion == sp[1]){
		return true
	}
	return false
})
spcontent.map((sp, index) =>{
	var v = sp[2]
	if(!v){
		v = 0
	}
	if(maxPatchVersion < v){
		maxPatchVersion = v
	}
})
spcontent = spcontent.filter((sp, index) =>{
	var v = sp[2]
	if(!v){
		v = 0
	}
	if(maxPatchVersion == v){
		return true
	}
	return false
})

spcontent = spcontent[0]

var version = {
	major:spcontent[0],
	minor:spcontent[1],
	patch:spcontent[2],
}

version.major = version.major ? version.major : 0;
version.minor = version.minor ? version.minor : 0;
version.patch = version.patch ? version.patch : 0;

version.patch = parseInt(version.patch);
version.patch = version.patch - 0 + 1;

version = [version.major,version.minor,version.patch]

version = version.join(".")

core.setOutput("version", version);


