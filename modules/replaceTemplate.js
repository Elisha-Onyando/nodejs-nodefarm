// Function to fill in the various templates with data from the json file
module.exports = (template, prodObj) => {

    let output = template.replace(/{%PRODUCTNAME%}/g, prodObj.productName);
    output = output.replace(/{%IMAGE%}/g, prodObj.image);
    output = output.replace(/{%PRICE%}/g, prodObj.price);
    output = output.replace(/{%FROM%}/g, prodObj.from);
    output = output.replace(/{%NUTRIENTS%}/g, prodObj.nutrients);
    output = output.replace(/{%QUANTITY%}/g, prodObj.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, prodObj.description);
    output = output.replace(/{%ID%}/g, prodObj.id);

    if (!prodObj.organic)
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    return output;
};