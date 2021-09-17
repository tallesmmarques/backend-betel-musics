import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Music } from "./Music"

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  title: string

  @Column({
    length: 100
  })
  ministerio: string

  @ManyToMany(() => Music, {
    onDelete: "SET NULL"
  })
  @JoinTable()
  musics: Music[]

  @Column({ type: "date", nullable: true })
  date: Date
}
