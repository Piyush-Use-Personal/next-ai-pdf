export const HtmlRenderer = ({ htmlContent }: { htmlContent: string }) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    );
};