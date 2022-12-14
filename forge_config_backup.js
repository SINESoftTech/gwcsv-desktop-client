module.exports = {
  packagerConfig: {
    afterAsar: function () {
    },
    afterComplete: function () {
    },
    afterCopy: function () {
    },
    afterCopyExtraResources: function () {
    },
    afterExtract: function () {
    },
    afterFinalizePackageTargets: function () {
    },
    afterPrune: function () {
    },
    all: true,
    appBundleId: "",
    appCopyright: "",
    appVersion: "",
    arch: ["ia32", "x64", "armv7l", "arm64", "mips64el"],
    asar: true,
    beforeAsar: function () {
    },
    beforeCopy: function () {
    },
    beforeCopyExtraResources: function () {
    },
    buildVersion: "",
    derefSymlinks: true,
    dir: "",
    download: "",
    electronVersion: "",
    electronZipDir: "",
    executableName: "",
    extraResource: "",
    icon: "",
    ignore: "",
    junk: "",
    name: "",
    osxUniversal: "",
    out: "",
    overwrite: "",
    platform: "",
    prebuiltAsar: "",
    prune: "",
    quiet: "",
    tmpdir: "",
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        appDirectory: "",
        authors: "",
        certificateFile: "",
        certificatePassword: "",
        copyright: "",
        description: "",
        exe: "",
        fixUpPaths: false,
        frameworkVersion: "",
        iconUrl: "",
        loadingGif: "",
        name: "",
        noDelta: false,
        noMsi: false,
        outputDirectory: "",
        owners: "",
        remoteReleases: "",
        remoteToken: "",
        setupExe: "",
        setupIcon: "",
        setupMsi: "",
        signWithParams: "",
        skipUpdateIcon: false,
        title: "",
        usePackageJson: false,
        version: ""
      }
    },
    {
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-deb',
      config: {}
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {}
    }
  ],
  publishers: [
    {}
  ],
  plugins: [],
  hooks: {},
  buildIdentifier: 'my-build'
}
