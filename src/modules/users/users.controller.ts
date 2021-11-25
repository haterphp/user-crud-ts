import {Controller, Get, Post} from "../../router.module";
import {UsersService} from "./users.service";

@Controller("")
export class UsersController {
    private usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    @Get("")
    public async getUsers(req, res){
        res.render("pages/users/index", {
            layout: "layout",
            users: await this.usersService.getUsers()
        });
    }

    @Post("")
    public async storeUser(req, res){
        const [errors, user] = await this.usersService.storeUser(req.body);
        if(errors){
            req.flash('error_message', "Почта должна быть уникальной");
            res.redirect('/create');
        }
        res.redirect('/');
    }

    @Get("/create")
    public async createUser(req, res) {
        res.render("pages/users/create", {
            layout: "layout",
            error_message: req.flash('error_message') || null
        });
    }

    @Get('/:id/remove')
    public async removeUser(req, res){
        await this.usersService.removeUser(req.params.id)
        res.redirect('/');
    }

    @Get('/:id/edit')
    public async editUser(req, res){
        res.render("pages/users/edit", {
            layout: "layout",
            user: await this.usersService.findUserById(req.params.id),
            error_message: req.flash('error_message') || null
        });
    }

    @Post('/:id/update')
    public async updateUser(req, res){
        const [errors, user] = await this.usersService.updateUser(req.params.id, req.body);
        if(errors){
            req.flash('error_message', "Почта должна быть уникальной");
            res.redirect('/' + req.params.id + "/edit");
        }
        res.redirect('/');
    }
}
