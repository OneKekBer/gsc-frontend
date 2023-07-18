export const filteredItemsByInput = (state, filter) => {
    if (filter.length === 0) return state;

    const normalizedFilter = filter.toLowerCase().split(" ");

    const filtered = state.filter((item) => {
        const filterParams = [
            item?.attributes?.Name?.toLowerCase(),
            item?.attributes?.Type?.toLowerCase(),
        ];

        return normalizedFilter.every((keyword) =>
            filterParams.some((param) => param?.includes(keyword))
        );
    });

    // const filtered = state.filter((i) =>
    //     i.attributes.Name.toLowerCase().includes(normalizedFilter)
    // );

    return filtered;
};

export const bestSellerItemsFilter = (state) => {
    state.filter((item) => item.attributes.isBestseller === true);
};
