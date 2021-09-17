import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Music } from "./Music";

@Entity()
export class MinisterioInfo {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  ministerio: string

  @ManyToOne(() => Music, music => music.ministeriosInfo, {
    onDelete: "CASCADE"
  })
  music: Music

  @Column({
    length: 5,
    nullable: true
  })
  tom: string

  @Column({ type: "date", nullable: true })
  lastPlayed: Date
}
