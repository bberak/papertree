function isNullOrEmpty(value)
{
    return (value == null || value === "");
}

function isNotNullOrEmpty(value)
{
    return !isNullOrEmpty(value);
}

function isNullOrWhiteSpace(value)
{
    return (value == null || !/\S/.test(value));
}

function isNotNullOrWhiteSpace(value)
{
    return !isNullOrWhiteSpace(value);
}

export { isNullOrEmpty, isNullOrWhiteSpace, isNotNullOrEmpty, isNotNullOrWhiteSpace };