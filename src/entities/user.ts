import {Entity, Column, PrimaryGeneratedColumn, Timestamp} from "typeorm"

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column()
    profile_pic: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date_created: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date_updated: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    last_online: Date;
}