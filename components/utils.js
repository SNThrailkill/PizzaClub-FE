import styles from '@/app/page.module.css'
    
// NextJS can not optimize gif images so you have to load them like normal assets
export const LoadingMessage = (
    <div>
        <img src="/loading.gif" alt="Loading"/>
        &nbsp;&nbsp;&nbsp;
        <span>Loading...</span>
    </div>
);

export const NoResultsMessage = (
    <div className={styles}>
        <h3>No Results Found</h3>
    </div>
)

export const LoginMessage = (
    <div>
        <img src="/loading.gif" alt="Logging In"/>
        &nbsp;&nbsp;&nbsp;
        <span>Logging In...</span>
    </div>
);

export const SendingMessage = (
    <div>
        <img src="/loading.gif" alt="Sending Order"/>
        &nbsp;&nbsp;&nbsp;
        <span>Sending Order...</span>
    </div>
);

export const SuccessMessage = (
    <div>
        <img src="/check.png" alt="Successfully Placed Order" width="50px" height="50px"/>
        &nbsp;&nbsp;&nbsp;
        <span>Successfully Placed Order!</span>
    </div>
);

export const DeletingMessage = (
    <div>
        <img src="/loading.gif" alt="Deleting Order"/>
        &nbsp;&nbsp;&nbsp;
        <span>Deleting Order...</span>
    </div>
);

export const DeletedMessage = (
    <div>
        <h1>Thank you! Come Again!</h1>
    </div>
);