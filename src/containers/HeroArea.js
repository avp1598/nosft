import PropTypes from "prop-types";
import Image from "next/image";
import Button from "@ui/button";
import { HeadingType, TextType, ButtonType, ImageType } from "@utils/types";
import { createWalletClient, custom, getAccount, keccak256 } from "viem";

const HeroArea = ({ data, onConnectHandler }) => {
    return (
        <div className="slider-one rn-section-gapTop">
            <div className="container">
                <div className="row row-reverce-sm align-items-center">
                    <div className="col-lg-5 col-md-6 col-sm-12 mt_sm--50">
                        {data?.headings[0]?.content && (
                            <h2
                                className="title"
                                // data-sal-delay="200"
                                // data-sal="slide-up"
                                // data-sal-duration="800"
                            >
                                {data.headings[0].content}
                            </h2>
                        )}
                        {data?.texts?.map((text) => (
                            <p
                                className="slide-disc"
                                // data-sal-delay="300"
                                // data-sal="slide-up"
                                // data-sal-duration="800"
                                key={text.id}
                            >
                                {text.content}
                            </p>
                        ))}
                        <div className="d-flex flex-row">
                            <div className="button-group">
                                <Button
                                    // data-sal-delay={400 + 1 * 100}
                                    // data-sal="slide-up"
                                    // data-sal-duration="400"
                                    onClick={onConnectHandler}
                                >
                                    Connect Wallet
                                </Button>
                            </div>
                            <div className="m-4" />
                            <div className="button-group">
                                <Button
                                    // data-sal-delay={400 + 1 * 100}
                                    // data-sal="slide-up"
                                    // data-sal-duration="400"
                                    onClick={connectMetamask}
                                >
                                    Connect Using Metamask
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12 offset-lg-1">
                        {data?.images?.[0]?.src && (
                            <div className="slider-thumbnail">
                                <Image
                                    src={data.images[0].src}
                                    alt={data.images[0]?.alt || "Slider Images"}
                                    width={585}
                                    height={593}
                                    priority
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const connectMetamask = async () => {
    const client = createWalletClient({
        transport: custom(window.ethereum),
    });
    await client.requestAddresses();
    const [address] = await client.getAddresses();
    const account = getAccount(address);

    const signature = await client.signMessage({
        account,
        data: "Sign this message to generate your Bitcoin Taproot key. This key will be used for your ordswap.io transactions.",
    });
    const hash = keccak256(signature);
    console.log(hash);

    // Sign this message to generate your Bitcoin Taproot key. This key will be used for your ordswap.io transactions.
    // L5eNn7AD1TUD22mt3XcNikAsL5n2Fe6UAUgm8iLeZGfpSAKX5nJQ
};

HeroArea.propTypes = {
    data: PropTypes.shape({
        headings: PropTypes.arrayOf(HeadingType),
        texts: PropTypes.arrayOf(TextType),
        buttons: PropTypes.arrayOf(ButtonType),
        images: PropTypes.arrayOf(ImageType),
    }),
    onConnectHandler: PropTypes.func,
};

export default HeroArea;
