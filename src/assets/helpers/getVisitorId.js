import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function getVisitorId() {
    const cached = localStorage.getItem('visitorId');
    if (cached) return cached;

    const fp = await FingerprintJS.load();
    const result = await fp.get();
    const visitorId = result.visitorId;

    localStorage.setItem('visitorId', visitorId);
    return visitorId;
}
