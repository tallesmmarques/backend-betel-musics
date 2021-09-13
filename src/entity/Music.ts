import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { MinisterioInfo } from "./MinisterioInfo";

@Entity()
export class Music {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 100
  })
  name: string

  @Column({
    length: 100
  })
  author: string

  @OneToMany(() => MinisterioInfo, ministerioInfo => ministerioInfo.music, {
    cascade: true
  })
  ministeriosInfo: MinisterioInfo[]

  @Column({ type: "text", nullable: true })
  linkCifra: string

  @Column({ type: "text", nullable: true })
  linkYoutube: string
}
