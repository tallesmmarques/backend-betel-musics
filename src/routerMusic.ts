import { Router, Request } from "express";
import { getManager } from "typeorm";
import { Music } from "./entity/Music";
import { MinisterioInfo } from "./entity/MinisterioInfo";

const router = Router()

router.get("/", async (_, res) => {
  const musicRepository = getManager().getRepository(Music)
  await musicRepository.find({
    relations: ["ministeriosInfo"],
    order: {
      name: "ASC"
    }
  }).then(async music => {
    res.status(200).json(music)
  }).catch(err => res.status(400).json({ err }))
})

router.get("/:id", async (req: Request<{ id: number }, any, Music>, res) => {
  const musicRepository = getManager().getRepository(Music)
  await musicRepository.findOneOrFail(req.params.id, {
    relations: ["ministeriosInfo"]
  }).then(async music => {
    res.status(200).json(music)
  }).catch(err => res.status(400).json({ err }))
})

router.post("/", async (req: Request<any, any, Music>, res) => {
  const musicRepository = getManager().getRepository(Music)
  const music = req.body

  await musicRepository.save(music).then(newMusic => {
    return res.status(200).json(newMusic)
  }).catch(err => {
    res.status(400).json({ error: true, message: err })
  })
})

router.put("/:id", async (req: Request<{ id: number }, any, Music>, res) => {
  const musicRepository = getManager().getRepository(Music)
  await musicRepository.findOneOrFail(req.params.id, {
    relations: ["ministeriosInfo"]
  }).then(async music => {
    await musicRepository.save({
      ...req.body,
      id: music.id,
      ministeriosInfo: [...music.ministeriosInfo]
    }).then(music => {
      return res.status(200).json(music)
    }).catch(err => {
      return res.status(400).json({ error: true, message: err })
    })
  }).catch(err => res.status(400).json(err))
})

router.put("/:id/:ministName", async (req: Request<{ id: number, ministName: string }, any, MinisterioInfo>, res) => {
  const musicRepository = getManager().getRepository(Music)
  await musicRepository.findOneOrFail(req.params.id, {
    relations: ["ministeriosInfo"]
  }).then(async music => {
    const minists = music.ministeriosInfo
    const findMinist = minists.find(minist => minist.ministerio == req.params.ministName)
    const ministId = findMinist == undefined ? 0 : findMinist.id

    const ministerioRepository = getManager().getRepository(MinisterioInfo)

    if (!ministId) {
      await ministerioRepository.save({
        ...req.body,
        ministerio: req.params.ministName,
        music: music
      }).then(minist => {
        return res.status(200).json(minist)
      }).catch(err => res.status(400).json(err))
    }

    await ministerioRepository.findOneOrFail(ministId).then(async minist => {
      await ministerioRepository.save({
        ...req.body,
        id: minist.id,
      }).then(minist => {
        return res.status(200).json(minist)
      }).catch(err => {
        return res.status(400).json({ error: true, message: err })
      })
    }).catch(err => res.status(400).json(err))
  }).catch(err => res.status(400).json({ message: "Esta música é inválida", err }))
})

router.delete("/:id", async (req: Request<{ id: number }, any, Music>, res) => {
  const musicRepository = getManager().getRepository(Music)
  await musicRepository.findOneOrFail(req.params.id).then(async music => {
    await musicRepository.remove(music).then(music => {
      return res.status(200).json(music)
    }).catch(err => {
      return res.status(400).json({ error: true, message: err })
    })
  }).catch(err => res.status(400).json(err))
})

export default router

