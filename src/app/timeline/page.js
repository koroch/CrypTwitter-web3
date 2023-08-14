"use client";
import NewTweet from "@/components/NewTweet";
import Tweet from "@/components/Tweet";
import { getLastTweets } from "@/services/Web3Service";
import Head from "next/head";
import { useEffect, useState } from "react";


export default function TimeLine() {

    const [tweets, setTweets] = useState([]);
    const [page, setPage] = useState(1);

    async function loadTweets(page = 1) {
        try {
            const results = await getLastTweets(page);
            if (page > 1) {
                tweets.reverse().push(...results);
                setTweets(tweets.reverse());
            }
            else
                setTweets(results.reverse());
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadTweets(page);
    }, [page])

    function btnLoadMoreClick() {
        setPage(page + 1);
    }

    return (
        <>
            <Head>
                <title>CrypTwitter | TimeLine</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="geral-container">
                <div className="container px-4 py-5">
                    <div className="row">
                        <div className="layout">
                            <NewTweet />
                            {
                                tweets && tweets.length
                                    ? tweets.map(item => <Tweet key={Number(item.timestamp)} data={item} />)
                                    : <p>Nada para ver aqui. Faça o primeiro Tweet!</p>
                            }
                            {
                                tweets.length > 0 && tweets.length % 10 === 0
                                    ? (
                                        <div className="center">
                                            <input type="button" className="btn btn-primary" value="Mais Tweets" onClick={btnLoadMoreClick} />
                                        </div>
                                    )
                                    : <></>
                            }

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}