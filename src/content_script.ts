const onShorts = (currentPathname: string, lastPathname?: string) => {
    if (!currentPathname.startsWith("/shorts")) {
        return;
    }

    console.log("No shorts for you!");
    if (lastPathname && !lastPathname.startsWith("/shorts")) {
        window.history.back();
    } else {
        const rootUrl = `${window.location.protocol}//${window.location.host}/`;
        window.location.href = rootUrl;
    }
}

onShorts(window.location.pathname);

let lastPathname = window.location.pathname;
const observer = new MutationObserver(() => {
    const currentPathname = window.location.pathname;
    if (currentPathname !== lastPathname) {
        onShorts(currentPathname, lastPathname);
        lastPathname = currentPathname;
    }
});

observer.observe(document, { childList: true, subtree: true });