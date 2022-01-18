import axios from "axios";

async function getFileContent(attachmentURL: string): Promise<any> {
    return await axios({
        method: 'GET',
        url: attachmentURL
    }).catch(() => {
        throw new Error('An error occurred while trying to get the data');
    });
};
function createFile(content: WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: "string"): string; }, fileName: string): { attachment: Buffer, name: string } {
    return {
        attachment: Buffer.from(content, "utf-8"),
        name: fileName
    };
};

export {
    getFileContent,
    createFile
};