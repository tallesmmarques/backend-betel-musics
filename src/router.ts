import { Router, Request } from "express";
import { getManager } from "typeorm";
import { Music } from "./entity/Music";
import { MinisterioInfo, MinisterioType } from "./entity/MinisterioInfo";

const router = Router()

router.get("/", (_, res) => {
  return res.json({
    message: "Betel Musics API"
  })
})

router.get("/music", async (_, res) => {
  const musicRepository = getManager().getRepository(Music)
  const musics = await musicRepository.find({ relations: ["ministeriosInfo"] })
  return res.status(200).json(musics)
})

router.get("/music/:id", async (req: Request<{ id: number }, any, Music>, res) => {
  const musicRepository = getManager().getRepository(Music)
  await musicRepository.findOneOrFail(req.params.id, {
    relations: ["ministeriosInfo"]
  }).then(async music => {
    res.status(200).json(music)
  }).catch(err => res.status(400).json({ err }))
})

router.post("/music", async (req: Request<any, any, Music>, res) => {
  const musicRepository = getManager().getRepository(Music)
  const music = req.body

  await musicRepository.save(music).then(newMusic => {
    return res.status(200).json(newMusic)
  }).catch(err => {
    res.status(400).json({ error: true, message: err })
  })
})

router.put("/music/:id", async (req: Request<{ id: number }, any, Music>, res) => {
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

router.put("/minist/:id", async (req: Request<{ id: number }, any, MinisterioInfo>, res) => {
  const ministerioRepository = getManager().getRepository(MinisterioInfo)
  await ministerioRepository.findOneOrFail(req.params.id).then(async minist => {
    await ministerioRepository.save({
      ...req.body,
      id: minist.id,
    }).then(minist => {
      return res.status(200).json(minist)
    }).catch(err => {
      return res.status(400).json({ error: true, message: err })
    })
  }).catch(err => res.status(400).json(err))
})

router.put("/music/:id/:ministName", async (req: Request<{ id: number, ministName: MinisterioType }, any, MinisterioInfo>, res) => {
  const musicRepository = getManager().getRepository(Music)
  const music = await musicRepository.findOneOrFail(req.params.id, {
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

router.delete("/music/:id", async (req: Request<{ id: number }, any, Music>, res) => {
  const musicRepository = getManager().getRepository(Music)
  await musicRepository.findOneOrFail(req.params.id).then(async music => {
    await musicRepository.remove(music).then(music => {
      return res.status(200).json(music)
    }).catch(err => {
      return res.status(400).json({ error: true, message: err })
    })
  }).catch(err => res.status(400).json(err))
})
export { router }
