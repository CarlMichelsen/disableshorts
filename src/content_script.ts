class ShortsDenier {
    private static instance: ShortsDenier;
    private observing: boolean;
    private timeout: number | null;
    private lastPathName: string | null;
    private observer: MutationObserver;

    private constructor() {
        this.observing = false;
        this.timeout = null;
        this.lastPathName = null;
        this.observationHandler = this.observationHandler.bind(this);
        this.observer = new MutationObserver(this.observationHandler);
    }

    public static getInstance(): ShortsDenier {
        if (!ShortsDenier.instance) {
            ShortsDenier.instance = new ShortsDenier();
        }
        return ShortsDenier.instance;
    }

    private queueCheckShorts(currentPathname: string) {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
        }
    
        this.timeout = setTimeout(() => {
            this.checkShorts(currentPathname);
            this.timeout = null;
        }, 200);
    }

    private checkShorts(currentPathname: string) {
        if (!currentPathname.startsWith("/shorts")) {
            return;
        }
    
        console.log("No YouTube Shorts for you!");
        if (this.lastPathName && !this.lastPathName.startsWith("/shorts")) {
            window.history.back();
        } else {
            const rootUrl = `${window.location.protocol}//${window.location.host}/`;
            window.location.href = rootUrl;
        }
    }

    private observationHandler() {
        const currentPathname = window.location.pathname;
        if (currentPathname !== this.lastPathName) {
            this.queueCheckShorts(currentPathname);
            this.lastPathName = currentPathname;
        }
    }

    public observe(): void {
        if (!this.observing) {
            this.observer.observe(document, { childList: true, subtree: true });
            this.observing = true;
        }
    }
}


ShortsDenier.getInstance().observe();