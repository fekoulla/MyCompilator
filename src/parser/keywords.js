const keywords = {
    'console-object': { r: /(console)/, s: 'console' },
    'script-php-start': { r: /(<\?php)/, s: '<?php' },
    'script-end-php': { r: /(\?>)/, s: '?>' }
};

module.exports = keywords;