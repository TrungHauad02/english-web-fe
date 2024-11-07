export const filterTests = (testData, searchText, filter) => {
    return testData.filter((test) => {
        const matchesName = searchText
            ? test.name.toLowerCase().includes(searchText.toLowerCase())
            : true;

        const matchesType = filter === "All" || test.type === filter;

        return matchesName && matchesType;
    });
};

export const handleSearch = (testData, searchText, filter, setTests, setCurrentPage) => {
    const filteredTests = filterTests(testData, searchText, filter);
    setTests(filteredTests);
    setCurrentPage(1);
};
