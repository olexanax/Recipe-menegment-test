function createId(): string {
    const characters: string =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const length: number = 8;
    let id: string = "";

    for (let i: number = 0; i < length; i++) {
        const randomIndex: number = Math.floor(
            Math.random() * characters.length
        );
        id += characters.charAt(randomIndex);
    }

    return id;
}
export default createId;
