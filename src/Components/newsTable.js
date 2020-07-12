import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';


import NewsChart from './newsChart';

import styles from './NewsTable.module.scss';

import arrowIcon from '../arrow-up.png';


function NewsTable(props) {
    const { data, onPaginationChange, page, max, hitsPerPage } = props;
    const [trash, setTrash] = useState(JSON.parse(localStorage.getItem('hideNews')) || []);
    const [upVoteStore, setUpVoteStore] = useState(JSON.parse(localStorage.getItem('upVoteCount')) || {});
    console.log(data); 

    let showPagination = max > hitsPerPage;
    let isNextPage = false;
    if (showPagination) {
         isNextPage = (data !== null || data!==undefined || data!=='') && ((page + 1) * hitsPerPage) < max;
    }

    const displayData = (() => {
        if (data === null || data === undefined || data === ''){
            return [];
        } 

        const newArray = [];

        data.forEach(item => {
            const id = item.objectID;

            if (!trash.includes(id)) {
                newArray.push({
                    ...item,
                    points: item.points + (upVoteStore[id] || 0),
                });
            }
        });

        return newArray;
    })();

    const hideNews = (id) => {
        const newTrash = [...trash, id];
        setTrash(newTrash);

        localStorage.setItem('hideNews', JSON.stringify(newTrash));
    };

    const upVote = (id) => {
        const tempStore = { ...upVoteStore };

        if (tempStore[id]) {
            tempStore[id]++;
        } else {
            tempStore[id] = 1;
        }
        setUpVoteStore(tempStore);

        localStorage.setItem('upVoteCount', JSON.stringify(tempStore));
    };

    return (
        <>
            <table className={styles.tbl}>
                <thead>
                    <tr>
                        <th>Comments</th>
                        <th>Vote Count</th>
                        <th>UpVote</th>
                        <th>News Details</th>
                    </tr>
                </thead>
                <tbody>
                {
                  displayData && 
                  displayData.map(function (element) {
                     return <tr key={element.objectID}>
                       <td className={styles.textCenter}>{element.num_comments}</td>
                       <td className={element.points >= '50' ? (element.points < '100' ? styles.goodScore : styles.avgScore):styles.badScore }>{element.points}</td>
                       <td className={styles.textCenter}><span onClick={() => upVote(element.objectID)}><img className={styles.iconSize} src={arrowIcon} alt="up-arrow" /></span></td>
                       <td>
                            <span>{element.title}</span>
                            {/* <a className={styles.greyText} href={element.url} rel="noopener noreferrer external" target="_blank">({element.url.split('/')[2]})</a> */}
                            {element.url && <a className={styles.greyText} href={element.url} rel="noopener noreferrer external" target="_blank">({element.url})</a>}
                            
                            <span className={styles.greyText}> by </span>
                            <span>{element.author}</span>
                            <span className={styles.greyText}>{moment(element.created_at).startOf('day').fromNow()}</span>
                            <span className={styles.hideTxt} onClick={() => hideNews(element.objectID)}>Hide</span>
                       </td>
                     </tr>;
                  })
                }
                </tbody>
            </table>
            <div className={styles.pagination}>
                    <button data-testid="prevBtn" disabled={page === 0} onClick={() => onPaginationChange(page - 1)}>Prev</button>
                    <button data-testid="nextBtn" disabled={!isNextPage} onClick={() => onPaginationChange(page + 1)}>Next</button>
            </div>
            <NewsChart
                data={displayData}
            />
        </>
    );
}

NewsTable.propTypes = {
    data: PropTypes.array,
    onPaginationChange: PropTypes.func,
    page: PropTypes.number,
    max: PropTypes.number,
    hitsPerPage: PropTypes.number,
};

NewsTable.defaultProps = {
    data: [],
    onPaginationChange: null,
    page: 0,
    max: 100,
    hitsPerPage: 20,
};


export default NewsTable;
