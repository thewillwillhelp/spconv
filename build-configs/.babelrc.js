module.exports = {
    presets: [
        [
            '@babel/env',
            {
                targets: {
                    "chrome": "65",
                    "firefox": "70",
                    "opera": "65"
                }
            }
        ],
        '@babel/react'
    ]
}
