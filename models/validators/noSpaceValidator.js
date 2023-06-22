const noSpaceValidator = (value) => {
    return !/\s/.test(value); // Check if there are no spaces in the string
};

export default noSpaceValidator;