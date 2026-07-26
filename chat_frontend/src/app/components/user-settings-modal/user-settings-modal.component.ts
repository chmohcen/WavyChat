import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/chat.model';

interface SettingsForm {
  name: string;
  email: string;
  password: string;
  status: User['status'];
}

@Component({
  selector: 'app-user-settings-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-settings-modal.component.html',
  styleUrl: './user-settings-modal.component.scss'
})
export class UserSettingsModalComponent implements OnChanges {
  @Input() isOpen = false;
  @Input() currentUser: User | null = null;
  @Output() closed = new EventEmitter<void>();
  @Output() userUpdated = new EventEmitter<User>();

  selectedPictureFile: File | null = null;
  previewPictureUrl: string | null = null;
  private objectUrl: string | null = null;
  settingsForm: SettingsForm = this.toSettingsForm(null);
  statusOptions = [
    { value: 'online', label: 'Online' },
    { value: 'away', label: 'Away' },
    { value: 'offline', label: 'Offline' }
  ];

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentUser'] || changes['isOpen']) {
      this.resetSettingsForm();
    }
  }

  close(): void {
    this.resetPictureSelection();
    this.closed.emit();
  }

  saveSettings(): void {
    if (!this.currentUser) {
      return;
    }

    const request = this.selectedPictureFile
      ? this.buildSettingsFormData()
      : this.buildSettingsPayload();

    this.authService.updateCurrentUser(request).subscribe((user) => {
      this.currentUser = user;
      this.resetPictureSelection();
      this.userUpdated.emit(user);
      this.closed.emit();
    });
  }

  onPictureFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      this.resetPictureSelection();
      return;
    }

    this.revokePreviewObjectUrl();
    this.selectedPictureFile = file;
    this.objectUrl = URL.createObjectURL(file);
    this.previewPictureUrl = this.objectUrl;
  }

  private resolveSettingsFields(): { name: string; email: string; status: User['status']; password: string | null } {
    return {
      name: this.settingsForm.name.trim() || this.currentUser?.name || '',
      email: this.settingsForm.email.trim() || this.currentUser?.email || '',
      status: this.settingsForm.status,
      password: this.settingsForm.password.trim() || null
    };
  }

  private buildSettingsPayload(): Partial<User> {
    const { name, email, status, password } = this.resolveSettingsFields();
    const payload: Partial<User> = { name, email, status };

    if (password) {
      payload.password = password;
    }

    return payload;
  }

  private buildSettingsFormData(): FormData {
    const { name, email, status, password } = this.resolveSettingsFields();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('status', status);
    formData.append('email', email);

    if (password) {
      formData.append('password', password);
    }

    if (this.selectedPictureFile) {
      formData.append('picture', this.selectedPictureFile, this.selectedPictureFile.name);
    }

    return formData;
  }

  private resetSettingsForm(): void {
    this.settingsForm = this.toSettingsForm(this.currentUser);
    this.resetPictureSelection();
  }

  private toSettingsForm(user: User | null): SettingsForm {
    return {
      name: user?.name ?? '',
      email: user?.email ?? '',
      password: user?.password ?? '',
      status: user?.status ?? 'online'
    };
  }

  private resetPictureSelection(): void {
    this.revokePreviewObjectUrl();
    this.selectedPictureFile = null;
    this.previewPictureUrl = this.currentUser?.final_picture ?? null;
  }

  private revokePreviewObjectUrl(): void {
    if (this.objectUrl) {
      URL.revokeObjectURL(this.objectUrl);
      this.objectUrl = null;
    }
  }
}
