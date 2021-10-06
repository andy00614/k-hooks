export function isOnCurPage() {
    return document.visibilityState !== 'hidden';
}

type MockRequest = () => Promise<string>;

export const mockRequest:MockRequest = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve('ok');
    }, 1000);
});


export const mockPaginationRequest = (params: any) => {
    const { count,currentPage, pageSize } = params;
    return new Promise(resolve => {
        setTimeout(() => {
            const list = [];
            for (let i = 0; i < count; i++) {
                list.push({
                    label: Math.random(),
                });
            }
            const result = {
                list,
                pageSize: pageSize,
                total: count,
                currentPage: currentPage,
            };
            resolve(result);
        }, 200);
    });
};
