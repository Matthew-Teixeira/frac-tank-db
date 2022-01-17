const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html')

const extention = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML : {
            validate(value, helpers) {
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if(clean !== value) return helpers.error('string.escapeHTML', { value })
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extention);

module.exports.volumeSchema = Joi.object({
        zone: Joi.number().required().min(1).max(3),
        tank: Joi.string().required(),
        totalV: Joi.number().required().min(0).max(13000),
        waterV: Joi.number().required().min(0).max(13000),
        productV: Joi.number().required().min(0).max(13000)
})