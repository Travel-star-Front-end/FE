import styled from "styled-components";

const IframeContainer = styled.div`
    position: relative;
    width: 100%;
    padding-top: 56.25%;
    margin: 0;
    padding: 0;
`;

const Iframe = styled.iframe`
    width: 100%;
    border: none;
`;


const IframePlayer = ({ iframeUrl }) => {
    if (!iframeUrl) {
        return null;
    }

    return (
        <IframeContainer>
            <Iframe
                src={iframeUrl}
                frameBorder="0"
                allow="encrypted-media"
                title="Spotify Player"
            />
        </IframeContainer>
    );
};

export default IframePlayer;
