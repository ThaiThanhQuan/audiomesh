export { };

declare global {

    interface IComment {
        _id: string,
        content: string,
        moment: number,
        user: {
            _id: string,
            email: string,
            name: string,
            role: string,
            type: string
        },
        track: {
            _id: string,
            title: string,
            description: string,
            trackUrl: string
        },
        isDeleted: false,
        createdAt: string,
        updatedAt: string
    }

    interface ITrackLike {
        _id: string,
        title: string,
        description: string,
        category: string,
        imgUrl: string,
        trackUrl: string,
        countLike: number,
        countPlay: number
    }

    interface IPaginateMeta {
        current: number;
        pageSize: number;
        pages: number;
        total: number;
    }

    interface ITrackTop {
        _id: string,
        title: string,
        description: string,
        category: string,
        imgUrl: string,
        trackUrl: string,
        countLike: number,
        countPlay: number,
        uploader: {
            _id: string,
            email: string,
            name: string,
            role: string,
            type: string
        },
        isDeleted: string,
        createdAt: string,
        updatedAt: string
    }
    interface IUser {
        role: string
        email: string
        address: string
        _id: string
        name: string
        username: string
        password: string
        age: string
        gender: string
    }

    interface IRequest {
        url: string;
        method: string;
        body?: { [key: string]: any };
        queryParams?: any;
        useCredentials?: boolean;
        headers?: any;
        nextOption?: any;
    }

    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: IPaginateMeta
        result: T[]
    }

    interface IShareTrack extends ITrackTop {
        isPlaying: boolean
    }

    interface ITrackContext {
        currentTrack: IShareTrack,
        setCurrentTrack: (v: IShareTrack) => void
    }
}
